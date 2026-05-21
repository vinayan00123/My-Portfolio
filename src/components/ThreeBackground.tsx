export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Subtle color glows for the dark theme */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[130px]" />
      <div className="absolute top-[-20%] right-[-10%] w-[550px] h-[550px] bg-purple-500/12 rounded-full blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />
    </div>
  );
}
