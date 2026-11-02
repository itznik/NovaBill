import os
import io
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from fpdf import FPDF
from dotenv import load_dotenv

# Load the Next.js environment variables
load_dotenv(dotenv_path="../.env.local")

MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise RuntimeError("FATAL: MONGODB_URI is missing. Check .env.local")

app = FastAPI(title="NovaBill Python Engine")
db_client = None

@app.on_event("startup")
async def startup_db_client():
    global db_client
    db_client = AsyncIOMotorClient(MONGODB_URI)
    print("🟢 Python Engine connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    db_client.close()

# --- PDF Generation Class ---
class ReceiptPDF(FPDF):
    def header(self):
        self.set_font("helvetica", "B", 24)
        self.cell(0, 10, "NovaBill.", border=False, align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(5)

# --- Microservice Endpoints ---
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "NovaBill Python Engine"}

@app.get("/api/engine/pdf/{receipt_uuid}")
async def generate_pdf(receipt_uuid: str):
    db = db_client.get_default_database()
    
    # 1. Fetch data directly from MongoDB
    receipt = await db.receipts.find_one({"receiptUuid": receipt_uuid})
    if not receipt:
        raise HTTPException(status_code=404, detail="Receipt not found")
        
    merchant = await db.merchants.find_one({"_id": receipt["merchantId"]})
    
    # 2. Construct the PDF
    pdf = ReceiptPDF()
    pdf.add_page()
    
    # Merchant Name
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, merchant.get("name", "Merchant"), new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.set_font("helvetica", "", 10)
    pdf.cell(0, 10, f"Order ID: {receipt.get('posOrderId')}", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    
    # Items
    pdf.set_font("helvetica", "B", 12)
    for item in receipt.get("items", []):
        pdf.cell(140, 8, f"{item['quantity']}x {item['name']}")
        pdf.cell(50, 8, f"${item['total']:.2f}", align="R", new_x="LMARGIN", new_y="NEXT")
        
    pdf.ln(5)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    
    # Totals
    pdf.set_font("helvetica", "", 12)
    pdf.cell(140, 8, "Subtotal:")
    pdf.cell(50, 8, f"${receipt['subtotal']:.2f}", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.cell(140, 8, "Tax:")
    pdf.cell(50, 8, f"${receipt['tax']:.2f}", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(140, 12, "Grand Total:")
    pdf.cell(50, 12, f"${receipt['grandTotal']:.2f}", align="R", new_x="LMARGIN", new_y="NEXT")

    # 3. Output to byte stream (no files saved to disk)
    pdf_bytes = pdf.output(dest="S").encode("latin-1")
    
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=receipt_{receipt_uuid}.pdf"}
    )
