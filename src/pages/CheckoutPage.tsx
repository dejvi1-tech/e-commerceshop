import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ShieldCheck, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { Money } from '../components/Money';
import { toast } from '../store/toastStore';

type CheckoutFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const shippingTotal = useCartStore((state) => state.shippingTotal());
  const tax = useCartStore((state) => state.tax());
  const total = useCartStore((state) => state.total());
  const clear = useCartStore((state) => state.clear);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<CheckoutFormData>({
    defaultValues: {
      shippingMethod: 'standard',
      paymentMethod: 'card',
      country: 'US'
    }
  });

  const watchedValues = watch();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-6">Add some products to proceed with checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
      return;
    }

    if (currentStep === 'payment') {
      setCurrentStep('review');
      return;
    }

    // Final submission
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success
      clear();
      navigate('/checkout/success', {
        state: {
          orderData: data,
          items: items.map(item => ({
            ...item,
            product: products.find(p => p.id === item.productId)
          })),
          totals: { subtotal, discount, shippingTotal, tax, total }
        }
      });

      toast.success('Order placed!', 'Your order has been submitted successfully.');
    } catch (error) {
      toast.error('Order failed', 'Please try again or contact support.');
    }
  };

  const stepTitles = {
    shipping: 'Shipping Information',
    payment: 'Payment Method',
    review: 'Review Order'
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/cart"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          {(['shipping', 'payment', 'review'] as const).map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep === step
                    ? 'bg-brand-500 text-white'
                    : index < (['shipping', 'payment', 'review'] as const).indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  currentStep === step ? 'text-white' : 'text-slate-400'
                }`}
              >
                {stepTitles[step]}
              </span>
              {index < 2 && (
                <div className="w-8 h-px bg-slate-700 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Main Form */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800/60 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {stepTitles[currentStep]}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Shipping Step */}
            {currentStep === 'shipping' && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      {...register('postalCode', { required: 'Postal code is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      placeholder="10001"
                    />
                    {errors.postalCode && (
                      <p className="text-red-400 text-sm mt-1">{errors.postalCode.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Country *
                    </label>
                    <select
                      {...register('country', { required: 'Country is required' })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Shipping Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        value="standard"
                        {...register('shippingMethod')}
                        className="text-brand-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">Standard Shipping</span>
                          <span className="text-slate-400">$6.50</span>
                        </div>
                        <p className="text-sm text-slate-400">2-4 business days</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        value="express"
                        {...register('shippingMethod')}
                        className="text-brand-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">Express Shipping</span>
                          <span className="text-slate-400">$18.00</span>
                        </div>
                        <p className="text-sm text-slate-400">1-2 business days</p>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        value="card"
                        {...register('paymentMethod')}
                        className="text-brand-500"
                      />
                      <CreditCard className="h-5 w-5 text-slate-400" />
                      <span className="text-white">Credit / Debit Card</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        value="paypal"
                        {...register('paymentMethod')}
                        className="text-brand-500"
                      />
                      <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        P
                      </div>
                      <span className="text-white">PayPal</span>
                    </label>
                  </div>
                </div>

                {watchedValues.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        {...register('cardNumber', { required: 'Card number is required' })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          {...register('expiryDate', { required: 'Expiry date is required' })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <p className="text-red-400 text-sm mt-1">{errors.expiryDate.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          {...register('cvv', { required: 'CVV is required' })}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        {...register('nameOnCard', { required: 'Name on card is required' })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                        placeholder="John Doe"
                      />
                      {errors.nameOnCard && (
                        <p className="text-red-400 text-sm mt-1">{errors.nameOnCard.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Shipping Address</h3>
                  <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300">
                    <p>{watchedValues.firstName} {watchedValues.lastName}</p>
                    <p>{watchedValues.address}</p>
                    <p>{watchedValues.city}, {watchedValues.postalCode}</p>
                    <p>{watchedValues.country}</p>
                    <p>{watchedValues.email}</p>
                    <p>{watchedValues.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Payment Method</h3>
                  <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300">
                    <p className="capitalize">{watchedValues.paymentMethod}</p>
                    {watchedValues.paymentMethod === 'card' && watchedValues.cardNumber && (
                      <p>**** **** **** {watchedValues.cardNumber.slice(-4)}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Shipping Method</h3>
                  <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300">
                    <p className="capitalize">
                      {watchedValues.shippingMethod === 'standard'
                        ? 'Standard Shipping (2-4 business days)'
                        : 'Express Shipping (1-2 business days)'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className="flex justify-between pt-6 border-t border-slate-700">
              {currentStep !== 'shipping' && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 'payment') setCurrentStep('shipping');
                    if (currentStep === 'review') setCurrentStep('payment');
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                disabled={!isValid && currentStep !== 'review'}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors ml-auto"
              >
                {currentStep === 'review' ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800/60 p-6 h-fit">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return (
                <div key={item.productId} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                    <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                  </div>
                  <div className="text-sm text-white">
                    <Money value={item.price * item.qty} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-sm border-t border-slate-700 pt-4">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <Money value={subtotal} />
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-300">
                <span>Discount</span>
                <Money value={-discount} />
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Shipping</span>
              <Money value={shippingTotal} />
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Tax</span>
              <Money value={tax} />
            </div>
            <div className="flex justify-between font-semibold text-white text-base border-t border-slate-700 pt-2">
              <span>Total</span>
              <Money value={total} />
            </div>
          </div>

          <div className="mt-6 space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Secure checkout with SSL encryption</span>
            </div>
            <div className="flex items-start gap-2">
              <Truck className="h-4 w-4 text-brand-400 mt-0.5 flex-shrink-0" />
              <span>Free returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};