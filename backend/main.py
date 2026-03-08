from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Invoice Generator API",
    description="Backend API for the Invoice Generator application.",
    version="1.0.0"
)

# Configure CORS so the frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development; adjust for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define some basic models for the invoice data
class InvoiceItem(BaseModel):
    id: int
    date: str
    itemName: str
    quantity: int
    price: float

class InvoiceData(BaseModel):
    invoiceNumber: str
    dateIssued: str
    dueDate: Optional[str] = ""
    clientName: str
    clientCompany: Optional[str] = ""
    clientAddress: Optional[str] = ""
    projectDescription: Optional[str] = ""
    logo: Optional[str] = ""
    companyName: str
    companyAddress: str
    companyPhone: str
    companyEmail: Optional[str] = ""
    companyTagline: Optional[str] = ""
    companyWebsite: Optional[str] = ""
    currency: str
    items: List[InvoiceItem]
    notes: Optional[str] = ""
    themeColor: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Invoice Generator API. The backend is running successfully!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/invoices")
def save_invoice(invoice: InvoiceData):
    # Here you would typically save the invoice to a database
    # For now, we'll just return it as a success response
    return {
        "message": "Invoice processed successfully",
        "data": invoice.dict()
    }
