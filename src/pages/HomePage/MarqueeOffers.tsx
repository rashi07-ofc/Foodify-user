import Marquee from "react-fast-marquee";

const MarqueeOffers = () => {
  return (
    <Marquee pauseOnHover speed={50} className="bg-orange-100 py-3 text-orange-600 font-semibold">
      🍕 Flat 50% off on Pizza &nbsp;&nbsp; | &nbsp;&nbsp;
      🍔 Buy 1 Get 1 Free Burger &nbsp;&nbsp; | &nbsp;&nbsp;
      🥗 Healthy Bowls Just ₹99 &nbsp;&nbsp; | &nbsp;&nbsp;
      🍣 Sushi Madness Every Sunday!
    </Marquee>
  );
};

export default MarqueeOffers;
