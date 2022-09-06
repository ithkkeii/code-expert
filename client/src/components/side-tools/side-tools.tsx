import React, { useState } from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';

const tools = ['description', 'submissions'] as const;
const sections = ['descriptions', 'submissions'] as const;

export function Example() {
  let [categories] = useState({
    Description: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Submissions: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="bg-grey-200 flex space-x-1 rounded-xl p-1">
          {sections.map((section) => (
            <Tab
              key={section}
              className={({ selected }) =>
                classNames(
                  'w-full rounded py-2.5 text-sm font-medium capitalize leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'hover:bg-white/[0.12] hover:text-blue-500',
                )
              }
            >
              {section}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const SideTools = () => {
  const [active, setActive] = useState<typeof tools[number]>('description');

  return (
    <div>
      <TabsUnstyled value={active}>
        <TabsListUnstyled>
          {tools.map((tool) => {
            const tabCln = classNames({
              'bg-white': tool === active,
            });

            return (
              <TabUnstyled
                key={tool}
                className={`border border-b-0 py-2 px-8 capitalize ${tabCln}`}
                onClick={() => setActive(tool)}
              >
                {tool}
              </TabUnstyled>
            );
          })}
        </TabsListUnstyled>
        {tools.map((tool) => {
          return (
            <TabPanelUnstyled
              key={tool}
              value={tool}
              className="h-full bg-white"
            >
              {tool} page
            </TabPanelUnstyled>
          );
        })}
      </TabsUnstyled>
    </div>
  );
};

export default SideTools;
