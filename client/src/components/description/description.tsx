import {
  faHeart,
  faShareFromSquare,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import React from 'react';

const Description = () => {
  return (
    <div className="h-full overflow-hidden overflow-y-scroll border border-t-0 border-l-0 border-gray-200 p-4">
      <div className="text-lg">1. Two Sum</div>
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-1 font-light">
        <div className="text-green-700">Easy</div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span className="px-1">471823</span>
        </div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faThumbsDown} />
          <span className="px-1">18016</span>
        </div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faHeart} />
          <span className="px-1">Add to list</span>
        </div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faShareFromSquare} />
          <span className="px-1">Share</span>
        </div>
      </div>
      <div className="font-light">
        <p>
          Given an array of integers{' '}
          <span className="bg-gray-100 p-1">nums</span> and an integer{' '}
          <span className="bg-gray-100 p-1">target</span>, return{' '}
          <em>
            indices of the two numbers such that they add up to{' '}
            <span className="bg-gray-100 p-1">target</span>.
          </em>
        </p>
        You may assume that each input would have{' '}
        <em>
          <strong>exactly one solution</strong>
        </em>
        , and you may not use the same element twice.
        <p>You can return the answer in any order.</p>
        <div className="pt-2 pb-1">
          <p>Example 1:</p>
          <div className="bg-gray-50 p-4">
            <div>
              <strong>Input:</strong> nums = [2,7,11,15], target = 9
            </div>
            <div>
              <strong>Output:</strong> [0,1]
            </div>
            <div>
              <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
              return [0, 1].
            </div>
          </div>
          <p>Example 2:</p>
          <div className="bg-gray-50 p-4">
            <div>
              <strong>Input:</strong> nums = [2,7,11,15], target = 9
            </div>
            <div>
              <strong>Output:</strong> [0,1]
            </div>
            <div>
              <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
              return [0, 1].
            </div>
          </div>
          <p>Example 3:</p>
          <div className="bg-gray-50 p-4">
            <div>
              <strong>Input:</strong> nums = [2,7,11,15], target = 9
            </div>
            <div>
              <strong>Output:</strong> [0,1]
            </div>
            <div>
              <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
              return [0, 1].
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <Disclosure>
          <Disclosure.Button className="py-2">Hint 1</Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            A really brute force way would be to search for all possible pairs
            of numbers but that would be too slow. Again, it&lsquo;s best to try
            out brute force solutions for just for completeness. It is from
            these brute force solutions that you can come up with optimizations.
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button className="py-2">Hint 2</Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            So, if we fix one of the numbers, say x, we have to scan the entire
            array to find the next number y which is value - x where value is
            the input parameter. Can we change our array somehow so that this
            search becomes faster?
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button className="py-2">Hint 3</Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            The second train of thought is, without changing the array, can we
            use additional space somehow? Like maybe a hash map to speed up the
            search?
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  );
};

export default Description;
