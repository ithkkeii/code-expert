import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';

const data = [
  { id: 1, content: '' },
  { id: 2, content: '' },
  { id: 3, content: '' },
  { id: 4, content: '' },
  { id: 5, content: '' },
  { id: 6, content: '' },
  { id: 7, content: '' },
  { id: 8, content: '' },
  { id: 9, content: '' },
  { id: 10, content: '' },
  { id: 11, content: '' },
  { id: 12, content: '' },
];

const TestCases = () => {
  return (
    <div>
      <Tab.Group vertical>
        <div className="flex h-full w-full flex-row py-2">
          <Tab.List className="h-full space-y-2 overflow-x-scroll px-4 py-2">
            {data.map((d) => (
              <Tab
                as="div"
                key={d.id}
                className={({ selected }) =>
                  classNames(
                    'cursor-pointer rounded p-2',
                    selected ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600',
                  )
                }
              >
                Test case {d.id}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="h-full flex-1 py-2">
            {data.map((d) => (
              <Tab.Panel
                key={d.id}
                className="h-full rounded border border-gray-200"
              ></Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default TestCases;
