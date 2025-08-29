import Marquee from "react-fast-marquee";

export default function Ticker({ text }) {
  return (
    <div className="ticker">
      <Marquee gradient={false} speed={50}>
        <span>{text}</span>
      </Marquee>
    </div>
  );
}
