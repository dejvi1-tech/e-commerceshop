import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, Home } from 'lucide-react';
import { Money } from '../components/Money';

export const CheckoutSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state?.orderData;
  const items = location.state?.items || [];
  const totals = location.state?.totals;

  // Generate order number
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    // Redirect if no order data
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const downloadReceipt = () => {
    const receiptData = {
      orderNumber,
      date: new Date().toLocaleDateString(),
      customer: {
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email,
        phone: orderData.phone
      },
      shippingAddress: {
        address: orderData.address,
        city: orderData.city,
        postalCode: orderData.postalCode,
        country: orderData.country
      },
      items,
      totals,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod
    };

    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `receipt-${orderNumber}.json`);
    linkElement.click();
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
        <p className="text-slate-400 text-lg">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      {/* Order Details */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Order Info */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800/60 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Order Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Order Number</h3>
              <p className="text-white font-mono">{orderNumber}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Order Date</h3>
              <p className="text-white">{new Date().toLocaleDateString()}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Email</h3>
              <p className="text-white">{orderData.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Shipping Method</h3>
              <p className="text-white capitalize">
                {orderData.shippingMethod === 'standard'
                  ? 'Standard Shipping (2-4 business days)'
                  : 'Express Shipping (1-2 business days)'
                }
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Payment Method</h3>
              <p className="text-white capitalize">{orderData.paymentMethod}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <button
              onClick={downloadReceipt}
              className="flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </button>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800/60 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Shipping Address</h2>

          <div className="text-slate-300 space-y-1">
            <p className="text-white font-medium">
              {orderData.firstName} {orderData.lastName}
            </p>
            <p>{orderData.address}</p>
            <p>{orderData.city}, {orderData.postalCode}</p>
            <p>{orderData.country}</p>
            <p>{orderData.phone}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-8 bg-slate-900/40 rounded-2xl border border-slate-800/60 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Order Items</h2>

        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.productId} className="flex gap-4 p-4 bg-slate-800/50 rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-slate-400 text-sm">Quantity: {item.qty}</p>
                <p className="text-slate-400 text-sm">
                  <Money value={item.price} /> each
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  <Money value={item.price * item.qty} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        {totals && (
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="space-y-2 text-sm max-w-xs ml-auto">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <Money value={totals.subtotal} />
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Discount</span>
                  <Money value={-totals.discount} />
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>Shipping</span>
                <Money value={totals.shippingTotal} />
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tax</span>
                <Money value={totals.tax} />
              </div>
              <div className="flex justify-between font-semibold text-white text-base border-t border-slate-700 pt-2">
                <span>Total</span>
                <Money value={totals.total} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-brand-500/10 border border-brand-400/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">What's Next?</h2>
        <div className="space-y-3 text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium text-white">Order Confirmation</p>
              <p className="text-sm">You'll receive an email confirmation shortly with your order details.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium text-white">Processing</p>
              <p className="text-sm">We'll prepare your order for shipment within 1-2 business days.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium text-white">Shipping</p>
              <p className="text-sm">You'll receive tracking information once your order ships.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Support */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          Need help with your order?{' '}
          <Link to="/contact" className="text-brand-400 hover:text-brand-300">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};