import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mt-6 flex flex-col items-center justify-between gap-10 rounded-[2rem] bg-base-200 px-8 py-12 lg:flex-row lg:px-16 lg:py-20">
      <div className="flex-1 space-y-6">
        <p className="font-heading text-xs font-bold tracking-[0.25em] text-primary uppercase">
          Workout Library
        </p>
        <h1 className="font-heading text-5xl font-bold uppercase leading-[1.1] text-white lg:text-[4.5rem]">
          Train with intent.<br />Log every set.
        </h1>
        <p className="max-w-md text-base text-base-content/60">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <div className="pt-2">
          <Link href="#library" className="inline-block rounded-xl bg-primary px-8 py-4 font-bold text-black transition-opacity hover:opacity-90">
            BROWSE WORKOUTS
          </Link>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center lg:justify-end">
        <Image
          src="/banner.png"
          alt="Gym Illustration"
          width={450}
          height={550}
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
