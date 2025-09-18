import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex flex-col">
      <Header />
      <main className="pt-16 flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 rounded-2xl shadow-xl">
          <Breadcrumb />
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center tracking-tight">About Us</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Welcome to <span className="text-primary font-bold">EduPlatform</span>! We are dedicated to providing high-quality online education for learners around the world.<br />
            Our mission is to empower students and professionals with the skills they need to succeed in a rapidly changing world.
          </p>
          <div className="space-y-8">
            <section className="bg-muted/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-accent mb-3 text-center">Our Mission</h2>
              <p className="text-base text-muted-foreground text-center">
                To make learning accessible, engaging, and effective for everyone.<br />
                We believe in lifelong learning and strive to offer courses that are relevant, practical, and taught by industry experts.
              </p>
            </section>
            <section className="bg-muted/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-accent mb-3 text-center">Our Team</h2>
              <p className="text-base text-muted-foreground text-center">
                Our team consists of passionate educators, developers, and designers who are committed to creating the best possible learning experience.<br />
                We work together to ensure our platform is user-friendly, up-to-date, and full of valuable resources.
              </p>
            </section>
            <section className="bg-muted/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-accent mb-3 text-center">Contact Us</h2>
              <p className="text-base text-muted-foreground text-center">
                Have questions or feedback? Reach out to us at <a href="mailto:support@eduplatform.com" className="text-primary underline font-semibold">support@eduplatform.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
