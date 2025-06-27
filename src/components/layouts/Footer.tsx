import { i18n } from '@/lang'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

interface FooterProps {
  lang: 'en' | 'zh'
}

const Footer = ({ lang }: FooterProps) => {
  const t = i18n[lang]

  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About us */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {t.aboutUs}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/our-story" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.ourStory}
                </a>
              </li>
              <li>
                <a 
                  href="/our-products" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.ourProducts}
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a 
                  href="/refund-returns" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.refundReturns}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {t.contactUs}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://goo.gl/maps/GznjYUJhS6rn9Kij8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t.address}
                </a>
              </li>
              <li>
                <a 
                  href="mailto:service@cloutyspace.com"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  service@cloutyspace.com
                </a>
              </li>
            </ul>
          </div>

          {/* Profile */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {t.profile}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/my-account" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.myAccount}
                </a>
              </li>
              <li>
                <a 
                  href="/checkout" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.checkout}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {t.followUs}
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100072498547679#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <FaFacebookF size={16} />
                </div>
              </a>
              <a 
                href="https://www.instagram.com/cloutyspace/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300">
                  <FaInstagram size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            Copyright © 2022 Clouty Space, All Rights Reserved
          </p>
          <div className="mt-4">
            <img 
              src="/src/assets/images/logo/Logo-100p.png" 
              alt="Clouty Space Logo" 
              className="h-8 mx-auto opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
