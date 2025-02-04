import { TReview } from '../../types/review.type';
import quoteIcon from '../../assets/icons/quote.svg';
import { Avatar } from 'antd';
import { Star } from 'lucide-react';

const ReviewCard = ({ item }: Partial<TReview | any>) => {
  const { name, location, rating, description, image } = item;
  const totalStars = 5;

  return (
    <div className="w-full p-6 lg:shadow rounded ">
      <div className="flex items-center justify-between">
        <div className="md:flex items-center">
          {image === null ? (
            <div>
              <Avatar
                style={{
                  background: '#3F90FC',
                  fontSize: '24px',
                  width: '44px',
                  height: '44px',
                }}
              >
                {name.slice(0, 1)}
              </Avatar>
            </div>
          ) : (
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={image} alt={name} />
              </div>
            </div>
          )}
          <div className="ml-5 mt-1 lg:mt-0">
            <h2 className="text-base lg:text-xl font-semibold text-secondary">
              {name}
            </h2>
            <p className="font-medium text-accent">{location}</p>
          </div>
        </div>
        <figure>
          <img src={quoteIcon} alt="Quote" className="w-12" />
        </figure>
      </div>
      <div className="mt-4">
        <p className="text-sm text-accent capitalize leading-6">
          {description}
        </p>
        <div className="mt-3">
          <div className="flex gap-1">
            {Array.from({ length: totalStars }, (_, index) => {
              const filled = index + 1 <= Math.floor(rating);
              const halfFilled =
                index + 1 > Math.floor(rating) && index < rating;

              return (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    filled
                      ? 'text-yellow-500 fill-yellow-500'
                      : halfFilled
                        ? 'text-yellow-500 fill-opacity-50'
                        : 'text-gray-400'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
