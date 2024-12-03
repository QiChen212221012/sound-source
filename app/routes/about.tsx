export default function About() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">About Us</h2>
        <p className="text-gray-700 mb-8 text-center">
          Sound Source is a leading company in audio technology, focused on delivering high-quality sound experiences through innovation and expertise.
        </p>
  
        <div className="space-y-6">
          {/* Company Mission */}
          <section>
            <h3 className="text-xl font-semibold text-orange-500">Our Mission</h3>
            <p className="text-gray-700">
              Our mission is to revolutionize the way people experience sound by pushing the boundaries of audio technology. We strive to create products that inspire, connect, and elevate sound quality, making every moment unforgettable.
            </p>
          </section>
  
          {/* Company Vision */}
          <section>
            <h3 className="text-xl font-semibold text-orange-500">Our Vision</h3>
            <p className="text-gray-700">
              We envision a world where sound brings people closer together, transcending barriers and enhancing life experiences. Through continuous innovation, we aim to lead the audio industry and set new standards for quality, clarity, and immersive experiences.
            </p>
          </section>
  
          {/* Core Values */}
          <section>
            <h3 className="text-xl font-semibold text-orange-500">Core Values</h3>
            <ul className="text-gray-700 list-disc list-inside ml-4">
              <li><strong>Innovation</strong> - Constantly pushing the limits of technology to bring the best sound experience to our customers.</li>
              <li><strong>Quality</strong> - Committed to delivering high-quality products and services with an uncompromising focus on excellence.</li>
              <li><strong>Integrity</strong> - Upholding transparency, honesty, and responsibility in all of our business practices.</li>
              <li><strong>Customer Focus</strong> - Listening to our customers and putting their needs at the forefront of everything we do.</li>
            </ul>
          </section>
  
          {/* Company History */}
          <section>
            <h3 className="text-xl font-semibold text-orange-500">Our Journey</h3>
            <p className="text-gray-700">
              Founded in 2010, Sound Source began as a small team of passionate audio enthusiasts. Over the years, we have grown into a global leader, launching numerous innovative products that have set industry benchmarks. Today, we are proud to be a trusted brand recognized for our dedication to sound quality and customer satisfaction.
            </p>
          </section>
  
          {/* Call to Action */}
          <section className="text-center mt-6">
            <h3 className="text-xl font-semibold text-orange-500">Join Us</h3>
            <p className="text-gray-700">
              At Sound Source, we are always looking for talented individuals who share our passion for audio technology. If you're interested in being part of a dynamic team that's redefining sound, explore our career opportunities.
            </p>
          </section>
  
          {/* User Testimonials */}
          <section className="mt-10">
            <h3 className="text-3xl font-bold text-orange-600 mb-8 text-center">What Our Customers Say</h3>
            <div className="grid gap-6 md:grid-cols-2 text-gray-700">
              <div className="p-6 bg-gray-100 rounded-lg shadow">
                <p>“Sound Source's audio quality is unbeatable. I’ve never experienced such clarity before!”</p>
                <p className="mt-4 font-semibold">- Alex T.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow">
                <p>“Exceptional customer service and high-quality sound equipment. Highly recommend!”</p>
                <p className="mt-4 font-semibold">- Jamie L.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  