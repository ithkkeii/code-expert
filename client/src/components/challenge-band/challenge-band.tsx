import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faStar } from '@fortawesome/free-regular-svg-icons';
import classnames from 'classnames';
import { Level } from '../../../pages';

interface Props {
  title: string;
  slug: string;
  like: boolean;
  level: Level;
}

const ChallengeBand: React.FC<Props> = (props) => {
  const { title, slug, like, level } = props;
  console.log(level);

  const levelClassNames = classnames({
    'h-full w-[35px] flex-shrink-0 rounded-r-md': true,
    'bg-green-500': level === 'easy',
    'bg-blue-500': level === 'medium',
    'bg-red-500': level === 'hard',
  });

  // TODO: margin bottom should not be used
  return (
    <div className="mb-2 flex h-[50px] w-full flex-row items-center rounded-md bg-white shadow-[0_1px_2px_0px_#00000033]">
      <div className="px-2">
        <FontAwesomeIcon className="text-lg text-gray-400" icon={faCircle} />
      </div>
      <span className="min-w-0 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1" />
      <div className="px-2">
        <FontAwesomeIcon className="text-lg text-yellow-400" icon={faStar} />
      </div>
      <div className={levelClassNames} />
    </div>
  );
};

export default ChallengeBand;
