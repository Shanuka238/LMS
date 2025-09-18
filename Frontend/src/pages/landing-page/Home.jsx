import React from "react";
import Header from '../../components/ui/Header';

const reviews = [
  {
    name: "Ayesha Khan",
    text: "This platform made learning so easy and fun! The courses are well-structured and the instructors are amazing.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    name: "Ali Raza",
    text: "I improved my skills and landed a new job thanks to the E-learning courses. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Sara Ahmed",
    text: "The interactive quizzes and video lessons kept me engaged throughout. Best online learning experience!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4
  }
];

const Home = () => {
  return (
  <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="mb-12">
        <Header />
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-lg animate-bounce">Welcome to E-learning</h1>
        <p className="text-lg md:text-2xl text-blue-900 mb-8 max-w-2xl animate-fade-in-up">
          Unlock your potential with expert-led courses, interactive lessons, and a vibrant learning community. Start your journey today!
        </p>
        <a href="/course-catalog" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 animate-fade-in-up">
          Explore Courses
        </a>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 animate-fade-in-up">What Our Students Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="max-w-sm w-full bg-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-center animate-fade-in-up hover:scale-105 transition-transform duration-300">
              <img src={review.avatar} alt={review.name} className="w-20 h-20 rounded-full mb-4 shadow-md border-4 border-blue-200 animate-fade-in" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{review.name}</h3>
              <p className="text-blue-900 mb-3 text-center">{review.text}</p>
              <div className="flex space-x-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" /></svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8 mt-12 animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold">E-learning Platform</h3>
            <p className="text-sm">Empowering learners since 2025</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
        <div className="text-center text-xs mt-4">&copy; 2025 E-learning. All rights reserved.</div>
      </footer>

      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-up { animation: fadeInUp 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Home;
