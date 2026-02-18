const PaymentIcons = () => (
  <div className="flex items-center gap-3">
    {/* Mercado Pago */}
    <div className="bg-background rounded-md px-2 py-1 flex items-center justify-center h-8">
      <svg viewBox="0 0 48 20" className="h-5 w-auto" fill="none">
        <rect width="48" height="20" rx="3" fill="hsl(var(--background))" />
        <text x="4" y="14" fontSize="9" fontWeight="700" fill="#00B1EA" fontFamily="sans-serif">MP</text>
        <text x="18" y="14" fontSize="6" fontWeight="500" fill="hsl(var(--foreground))" fontFamily="sans-serif">Mercado Pago</text>
      </svg>
    </div>
    {/* Visa */}
    <div className="bg-background rounded-md px-2 py-1 flex items-center justify-center h-8">
      <svg viewBox="0 0 40 14" className="h-4 w-auto">
        <text x="2" y="12" fontSize="12" fontWeight="700" fontStyle="italic" fill="#1A1F71" fontFamily="sans-serif">VISA</text>
      </svg>
    </div>
    {/* Mastercard */}
    <div className="bg-background rounded-md px-2 py-1 flex items-center justify-center h-8">
      <svg viewBox="0 0 32 20" className="h-5 w-auto">
        <circle cx="11" cy="10" r="8" fill="#EB001B" opacity="0.9" />
        <circle cx="21" cy="10" r="8" fill="#F79E1B" opacity="0.9" />
        <path d="M16 4.5a8 8 0 0 1 0 11" fill="#FF5F00" opacity="0.8" />
      </svg>
    </div>
  </div>
);

export default PaymentIcons;
