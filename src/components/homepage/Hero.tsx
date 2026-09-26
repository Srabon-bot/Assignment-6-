import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="grid items-center gap-10 rounded-2xl border border-base-300 bg-base-200 p-8 lg:grid-cols-2 lg:p-12">
      <div className="space-y-5">
        <p className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
          Workout Library
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl uppercase font-heading">
          Train with intent. Log every set.
        </h1>
        <p className="max-w-md text-base-content/75">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <Link href="#library" className="btn btn-accent rounded-2xl text-black">
          Browse Workouts
        </Link>
      </div>
      <div className="relative flex w-full justify-center lg:justify-end">
        <Image
          src="/banner.png"
          alt="Gym Illustration"
          width={500}
          height={400}
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
