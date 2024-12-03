export default function TermsAndConditions() {
    return (
      <div className="p-6 max-w-3xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
            Terms and Conditions
          </h1>
          <div className="space-y-6">
            {/* Section: Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.
              </p>
            </div>
  
            {/* Section: User Responsibilities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                User Responsibilities
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to use our platform only for lawful purposes and in compliance with applicable laws. Any misuse, including posting false or harmful information, may result in account termination.
              </p>
            </div>
  
            {/* Section: Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                Our platform is provided "as is" without warranties of any kind. We are not liable for damages resulting from your use of the platform.
              </p>
            </div>
  
            {/* Section: Updates */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-700">
                We may update these Terms and Conditions from time to time. Continued use of the platform indicates your acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  