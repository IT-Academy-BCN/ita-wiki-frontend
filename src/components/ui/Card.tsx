interface CardProps {
  number: number;
  imageSource: string;
  imageAlt: string;
  title: string;
  text: string;
}

const Card = ({ number, imageSource, imageAlt, title, text }: CardProps) => {
  return (
    <div className="relative flex flex-col items-center gap-4 bg-card w-64 px-4 rounded-lg py-8">
      <span className="absolute left-0 top-1 p-3 text-sm text-gray-foreground tracking-widest">
        /0{number}
      </span>
      <img src={imageSource} alt={imageAlt} width={100} height={100} />
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-foreground">{text}</p>
    </div>
  );
};

export default Card;
