import { motion } from 'framer-motion';
import { Fragment } from 'react';

interface SlideInCharacters {
  text: string;
}

export const SlideInCharacters = ({ text }: SlideInCharacters) => {
  const characters = text.split('');

  return (
    <Fragment>
      {characters.map((character, index) => {
        if (character === ' ') {
          return (
            <motion.span
              key={index}
              className="inline-block w-4"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.1,
                delay: 0.5 + index * 0.05,
                ease: 'easeOut',
              }}
            />
          );
        }

        return (
          <motion.span
            className="inline-block"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            {character}
          </motion.span>
        );
      })}
    </Fragment>
  );
};
