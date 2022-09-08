import {
  faHeart,
  faShareFromSquare,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import React from 'react';

const content = `<div><p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>

<p>You can return the answer in any order.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

<p><strong>Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>

<p><strong>Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
	<li><strong>Only one valid answer exists.</strong></li>
</ul>

<p>&nbsp;</p>
<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than&nbsp;<code>O(n<sup>2</sup>)&nbsp;</code>time complexity?</div>`;

const Description = () => {
  return (
    <div className="h-full overflow-hidden overflow-y-scroll">
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
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex flex-col">
        <Disclosure>
          <Disclosure.Button className="py-2">Hint 1</Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            A really brute force way would be to search for all possible pairs
            of numbers but that would be too slow. Again, it&lsquo;s best to try
            out brute force solutions for just for completeness. It is from
            these brute force solutions that you can come up with optimizations.
          </Disclosure.Panel>
          <Disclosure.Button className="py-2">Hint 2</Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            So, if we fix one of the numbers, say x, we have to scan the entire
            array to find the next number y which is value - x where value is
            the input parameter. Can we change our array somehow so that this
            search becomes faster?
          </Disclosure.Panel>
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
