import ContactForm from "./contact-form";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 bg-rose-50" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-700 mt-2">Reach Out for a Custom Cake</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                  <Facebook className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Facebook</h3>
                  <p className="text-gray-600">@crumbcode</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                  <Instagram className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Instagram</h3>
                  <p className="text-gray-600">@crumbcode</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">cakes@crumbcodefiji.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">679 999 9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Street Road, Nakasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
