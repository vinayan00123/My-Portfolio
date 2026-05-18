export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Subtle color glows for the dark theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />
    </div>
  );
}
