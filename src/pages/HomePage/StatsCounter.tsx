import CountUp from "react-countup";

const StatsCounter = () => {
  return (
    <section className="py-12 bg-orange-50 text-center">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">We’re growing fast 🚀</h2>
      <div className="flex justify-center gap-12 flex-wrap text-gray-800 text-xl">
        <div>
          <CountUp end={50000} duration={3} />+ Orders Delivered
        </div>
        <div>
          <CountUp end={10000} duration={3} />+ Happy Customers
        </div>
        <div>
          <CountUp end={150} duration={3} />+ Partner Restaurants
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
