import { motion } from 'framer-motion';
import { Fragment } from 'react';

interface FadeInTextProps {
  text: string;
}

export const FadeInText = ({ text }: FadeInTextProps) => {
  const characters = text.split('');

  return (
    <Fragment>
      {characters.map((character, index) => {
        if (character === ' ') {
          return <span key={index} className="inline-block w-4" />;
        }

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
          >
            {character}
          </motion.span>
        );
      })}
    </Fragment>
  );
};
