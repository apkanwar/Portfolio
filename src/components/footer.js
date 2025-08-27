import Image from 'next/image';
export default function Footer() {
    return (
      <div className="pb-24 pt-12 relative w-full overflow-hidden">
        <Image
          src="/ai_mountain.jpg"
          alt="Footer Background"
          fill
          className="z-0 object-cover object-top scale-100 transition-transform duration-[4000ms]"
          priority
        />
        <section className="relative z-10 text-white text-center">
          <p className="font-dText text-2xl">
            &copy; 2024 Atinderpaul Kanwar
          </p>
        </section>
      </div>
    )
}