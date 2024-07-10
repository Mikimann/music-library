export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}
