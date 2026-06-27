"use client";

import { useForm } from "react-hook-form";
import { useState, Suspense } from "react";
import { toast } from "react-hot-toast";
import { MapPin, Phone, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

type FormData = {
  name: string;
  phone: string;
  cakeType: string;
  message: string;
  date: string;
};

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledCake = searchParams?.get("cake") || "";

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      cakeType: prefilledCake,
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WHATSAPP_NUMBER = "+917021266239"; // <-- CHANGE THIS TO YOUR MOM'S NUMBER LATER!

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Format the order details into a readable message
    const message = `Hello Fabilicious Cakes! 🎂
I would like to place an order:

*Name:* ${data.name}
*Phone:* ${data.phone}
*Cake Type:* ${data.cakeType}
*Date needed:* ${new Date(data.date).toLocaleDateString()}
*Message/Instructions:* ${data.message || 'None'}

Please let me know if this is possible and what the total cost will be. Thank you!`;

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    toast.success("Opening WhatsApp with your order details!");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-serif mb-6">
            Place an <span className="text-accent">Order</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Fill out the form below to request a custom cake, or reach out to us directly via WhatsApp.
            We require at least 24-48 hours notice for most orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Order Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-serif">Order Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Your Name *</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Phone Number *</label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,12}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Cake Type / Flavor *</label>
                <input
                  {...register("cakeType", { required: "Cake type is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="e.g. 1kg Eggless Chocolate Truffle"
                />
                {errors.cakeType && <p className="text-red-500 text-sm mt-1">{errors.cakeType.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Delivery / Pickup Date *</label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Custom Message / Instructions</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="Message on cake, theme details, delivery time preference..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    <Send className="h-5 w-5" /> Submit Order Request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-8">
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-6 font-serif">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Location</h4>
                    <p className="text-foreground/80">Mumbai, Maharashtra, India<br />(Home Kitchen - Pickup available)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Phone / WhatsApp</h4>
                    <p className="text-foreground/80">+91 70212 66239</p>
                  </div>
                </div>


              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
