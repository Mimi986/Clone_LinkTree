import {motion, AnimatePresence} from 'framer-motion'

const FloatingIcon = ({ icon: Icon, className, size = 24, delay = 0, duration = 3 }) => (
  <motion.div
    className={`absolute text-blue-600 ${className}`}
    animate={{
      y: [0, -12, 0],
      rotate: [0, 8, -8, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon size={size} />
  </motion.div>
)

export default FloatingIcon