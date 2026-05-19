import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">1. Information We Collect</h2>
            <p>We collect information you provide when you create an account (via Google Sign-In), upload product images, and use our generation services. This includes your name, email address, profile picture, uploaded images, and generation preferences.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve AIStudio services, process image generations, manage your account, enforce usage limits, and communicate important updates.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">3. Image Data</h2>
            <p>Uploaded product images are processed through AI models for generation purposes. We do not sell or share your images with third parties. Generated images are stored securely and accessible only to you.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, secure authentication via Supabase, and regular security audits to protect your data.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">5. Contact</h2>
            <p>For privacy-related inquiries, please contact us at privacy@aistudio.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
