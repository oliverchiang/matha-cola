'use client';

import { motion } from 'framer-motion';
import { Question } from '@/lib/engine/types';
import { getOperationSymbol } from '@/lib/engine/questionGenerator';

interface QuestionCardProps {
  question: Question;
  userAnswer: string;
  feedback: 'correct' | 'wrong' | null;
}

export default function QuestionCard({ question, userAnswer, feedback }: QuestionCardProps) {
  const symbol = getOperationSymbol(question.operation);

  return (
    <motion.div
      key={question.id}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`bg-white rounded-3xl p-8 shadow-xl w-full max-w-md mx-auto
        ${feedback === 'correct' ? 'ring-4 ring-success' : ''}
        ${feedback === 'wrong' ? 'shake ring-4 ring-cola-red/40' : ''}`}
    >
      <div className="flex items-center justify-center gap-4 text-5xl sm:text-6xl font-bold text-dark">
        <span>{question.operand1}</span>
        <span className="text-cola-red">{symbol}</span>
        <span>{question.operand2}</span>
        <span className="text-dark/40">=</span>
        <div className="min-w-[80px] h-[72px] sm:h-[80px] border-b-4 border-bubble-blue flex items-center justify-center">
          <motion.span
            key={userAnswer}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-bubble-blue"
          >
            {userAnswer || '?'}
          </motion.span>
        </div>
      </div>

      {feedback === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-lg text-cola-red/80 font-medium"
        >
          The answer is {question.answer}
        </motion.div>
      )}
    </motion.div>
  );
}
