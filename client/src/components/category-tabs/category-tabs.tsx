import { faClock, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import Description from '../description/description';
import Submissions from '../submissions/submissions';

const CategoryTabs = () => {
  const [categories] = useState([
    {
      title: 'descriptions',
      icon: <FontAwesomeIcon icon={faFileLines} />,
      component: <Description />,
    },
    {
      title: 'submissions',
      icon: <FontAwesomeIcon icon={faClock} />,
      component: <Submissions />,
    },
  ]);

  return (
    <div className="h-full overflow-hidden overflow-y-scroll">
      <Tab.Group>
        <Tab.List className="flex bg-gray-50">
          {categories.map((c) => {
            const { title, icon } = c;

            return (
              <Tab
                key={title}
                className={({ selected }) =>
                  classNames(
                    'h-10 py-2.5 px-8 text-sm font-medium capitalize text-gray-600',
                    'border border-t-0 border-gray-100',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'border-b-white bg-white'
                      : 'hover:bg-white/[0.12]',
                  )
                }
              >
                <div className="flex flex-row items-center justify-center space-x-2">
                  {icon}
                  <span>{title}</span>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {categories.map((c, idx) => {
            const { component } = c;

            return <Tab.Panel key={idx}>{component}</Tab.Panel>;
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CategoryTabs;
