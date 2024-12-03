export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          Privacy Policy
        </h1>
        <div className="space-y-6">
          {/* Section: Data Collection */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Data Collection
            </h2>
            <p className="text-gray-700 mb-4">
              We collect and process the following personal data when you use our platform:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Job details you post (e.g., title, description, location).</li>
              <li>Contact information (if provided).</li>
              <li>Browser and device information for analytics.</li>
            </ul>
          </div>

          {/* Section: Lawful Basis */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Lawful Basis for Data Processing
            </h2>
            <p className="text-gray-700 mb-4">
              We process your data based on your consent, which you may withdraw at any time. This consent is used for job posting, user communication, and analytics improvement.
            </p>
          </div>

          {/* Section: Data Security */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We employ strict security measures, including encryption, access control, and secure storage in compliance with GDPR Article 32. Personal data is securely stored and accessed only by authorized personnel.
            </p>
          </div>

          {/* Section: Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              For questions or to exercise your GDPR rights, contact us at:{" "}
              <span className="text-orange-600 font-semibold">
                privacy@soundsource.com
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
