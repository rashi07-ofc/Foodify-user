import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
// import "./FAQSection.css";

type FAQItem = {
  question: string;
  answer: string | string[];
};

const faqData: FAQItem[] = [
  {
    question: "Popular cuisines near me",
    answer: [
      "Bakery near me",
      "Beverages near me",
      "Biryani near me",
      "Burger near me",
      "Chinese near me",
      "Coffee near me",
      "Continental near me",
      "Desserts near me",
      "Italian near me",
      "Mithai near me",
      "Momos near me",
      "Mughlai near me",
      "North Indian near me",
      "Pasta near me",
      "Pizza near me",
      "Rolls near me",
      "Sandwich near me",
      "Shake near me",
      "South Indian near me",
      "Street Food near me",
    ],
  },
  {
    question: "Popular restaurant types near me",
    answer: [
      "Bakeries near me",
      "Bars near me",
      "Beverage Shops near me",
      "Bhojanalya near me",
      "Cafés near me",
      "Casual Dining near me",
      "Clubs near me",
      "Cocktail bars near me",
      "Confectioneries near me",
      "Dessert Parlors near me",
      "Dhabas near me",
      "Fine Dining near me",
      "Food Courts near me",
      "Food Trucks near me",
      "Irani Cafes near me",
      "Kiosks near me",
      "Lounges near me",
      "Microbreweries near me",
      "Paan Shop near me",
      "Quick Bites near me",
      "Sweet Shops near me",
    ],
  },
  {
    question: "Explore Dining Cities at Zomato",
    answer: [
      "Agartala",
      "Agra",
      "Ahmedabad",
      "Ajmer",
      "Akluj",
      "Allahabad",
      "Alwar",
      "Ambasamudram",
      "Amli",
      "Amritsar",
      "Anand Nagar",
      "Aurangabad",
      "Auroville",
      "Ausa",
      "Bageshwar",
      "Balapur",
      "Banaskantha",
      "Bangarapet",
      "Baramkela",
      "Barasat",
      "Bargarh",
      "Baruipur",
      "Bastar",
      "Bavla",
      "Belagavi",
      "Bellary",
      "Bengaluru",
      "Bhabhua",
      "Bhawanipatna",
      "Bhilai",
      "Bhojpur",
      "Bhopal",
      "Bhubaneswar",
      "Bijapur",
      "Bikaner",
      "Bilaspur(HP)",
      "Birbhum",
      "Bodoland",
      "Bokaro",
      "Budgam",
      "Chainpur",
      "Chamba",
      "Chamoli",
      "Champawat",
      "Chandigarh",
      "Changanassery",
      "Channapatna",
      "Channarayapatna",
      "Chauhatta",
      "Chengam",
      "Chennai",
      "Chinsurah",
      "Chiplun",
      "Coimbatore",
      "Cumbum",
      "Cuttack",
      "Dahegam",
      "Damoh",
      "Darjeeling",
      "Dehradun",
      "Delhi NCR",
      "Deolali",
      "Deoria",
      "All Dineout cities",
    ],
  },
  {
    question: "Restaurants in Popular Locations",
    answer: [
      "Radisson Blu Plaza Delhi",
      "Radisson Blu MBD Hotel",
      "The Imperial New Delhi",
      "The Claridges, Aurangzeb",
      "City Centre Mall, MG Road",
      "The Ashok, Chanakyapuri",
      "Courtyard by Marriott",
      "Hyatt Regency, Bhikaji Cama",
      "ITC Maurya, Chanakyapuri",
      "Jaypee Siddharth, Rajendra Place",
      "Jaypee Vasant Continental",
      "Le Meridien New Delhi",
      "The Park, Connaught Place",
      "Hilton, Janak Puri",
      "Crowne Plaza, Sector 29",
      "Trident, Udyog Vihar",
      "The Oberoi, Udyog Vihar",
      "Hotel The Royal Plaza",
      "Sheraton New Delhi Hotel",
      "The Grand New Delhi",
      "The Leela Ambience, DLF",
      "The Atrium, Suraj Kund",
      "DLF Promenade Mall, Vasant Kunj",
      "DLF Avenue, Saket",
      "West End Mall, Janak Puri",
      "City Square Mall, Rajouri Garden",
      "West Gate Mall",
      "Select Citywalk Mall, Saket",
      "Pacific Mall (Sahibabad)",
      "Metro Walk Mall, Rohini",
      "Pacific Mall - NSP",
      "DLF City Centre Mall, Shalimar Bagh",
      "Spice World Mall, Sector 25",
      "Supertech Shopprix Mall",
      "Ansal Plaza Mall, Knowledge Park",
      "Central Plaza Mall, Golf Course Road",
      "Ansal Plaza Mall, Palam Vihar",
      "Sahara Mall, MG Road",
      "JMD Regent Arcade Mall",
      "MGF Metropolitan Mall",
      "Vyapar Kendra, Palam Vihar",
    ],
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2
        className="text-3xl md:text-4xl mb-2 text-[#FF9D59] font-extrabold italic drop-shadow-lg mb-2"
        style={{ fontFamily: '"Dancing Script", cursive' }}
      >
        Explore options near me
      </h2>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="bg-white shadow-sm border border-orange-400 rounded-md mb-4"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left px-6 py-4 flex justify-between items-center"
          >
            <span className="font-medium text-lg">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-700 text-sm">
              {Array.isArray(faq.answer) ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-4">
                  {faq.answer.map((item, i) => (
                    <div
                      key={i}
                      className="text-gray-600 hover:underline cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{faq.answer}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
