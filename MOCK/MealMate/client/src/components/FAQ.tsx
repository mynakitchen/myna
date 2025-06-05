import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 section-fade"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about our meal service.</p>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto section-fade"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} isLast={index === FAQ_ITEMS.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, isLast }: { question: string; answer: string; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`py-5 ${isLast ? "" : "border-b border-gray-200"}`}>
      <button
        className="flex w-full justify-between items-center text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus className="text-gray-400 h-5 w-5 flex-shrink-0" />
        ) : (
          <Plus className="text-gray-400 h-5 w-5 flex-shrink-0" />
        )}
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-3">
          <p className="text-gray-600">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
}
