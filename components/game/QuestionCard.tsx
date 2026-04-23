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
  const isWordProblem = !!question.wordProblem;
  const isMakeTens = question.operation === 'make-tens';

  const blank = (
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
  );

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
      {isWordProblem ? (
        <>
          {/* Word problem text */}
          <p className="text-lg sm:text-xl font-medium text-dark leading-relaxed mb-5">
            {question.wordProblem}
          </p>
          {/* Answer input */}
          <div className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-bold">
            <span className="text-dark/40">Answer:</span>
            <div className="min-w-[80px] h-[64px] sm:h-[72px] border-b-4 border-bubble-blue flex items-center justify-center">
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
        </>
      ) : isMakeTens ? (
        /* Make-tens: blank on left or right of the visible operand */
        <div className="flex items-center justify-center gap-4 text-5xl sm:text-6xl font-bold text-dark">
          {question.blankPosition === 'left' ? (
            <>
              {blank}
              <span className="text-cola-red">+</span>
              <span>{question.operand1}</span>
            </>
          ) : (
            <>
              <span>{question.operand1}</span>
              <span className="text-cola-red">+</span>
              {blank}
            </>
          )}
          <span className="text-dark/40">=</span>
          <span>{question.target ?? 0}</span>
        </div>
      ) : (
        /* Standard equation */
        <div className="flex items-center justify-center gap-4 text-5xl sm:text-6xl font-bold text-dark">
          <span>{question.operand1}</span>
          <span className="text-cola-red">{getOperationSymbol(question.operation)}</span>
          <span>{question.operand2}</span>
          <span className="text-dark/40">=</span>
          {blank}
        </div>
      )}

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
