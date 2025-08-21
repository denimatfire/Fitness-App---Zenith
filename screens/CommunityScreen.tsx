
import React from 'react';
import { HeartIcon } from '../components/icons/HeartIcon';
import { ChatIcon } from '../components/icons/ChatIcon';

const mockFeed = [
    { id: 1, name: 'Jane Doe', avatar: 'https://picsum.photos/seed/avatar1/100/100', text: 'Just hit a new PR on my squat! Feeling amazing today. 💪', image: 'https://picsum.photos/seed/squat/600/400', likes: 23, comments: 5 },
    { id: 2, name: 'John Smith', avatar: 'https://picsum.photos/seed/avatar2/100/100', text: 'Completed the 30-day plank challenge. It was tough but so worth it!', image: null, likes: 45, comments: 12 },
    { id: 3, name: 'Emily White', avatar: 'https://picsum.photos/seed/avatar3/100/100', text: 'Morning run with a beautiful view. Best way to start the day. ☀️', image: 'https://picsum.photos/seed/run/600/400', likes: 102, comments: 18 },
];

const PostCard: React.FC<{ post: typeof mockFeed[0] }> = ({ post }) => (
    <div className="bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden">
        <div className="p-4 flex items-center space-x-3">
            <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-gray-900 dark:text-white">{post.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
        </div>
        <p className="px-4 pb-3 text-gray-800 dark:text-gray-200">{post.text}</p>
        {post.image && <img src={post.image} alt="Post content" className="w-full h-auto" />}
        <div className="flex items-center p-4 text-gray-500 dark:text-gray-400 space-x-6">
            <button className="flex items-center space-x-1 hover:text-red-500">
                <HeartIcon className="w-5 h-5"/> 
                <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary-500">
                <ChatIcon className="w-5 h-5" /> 
                <span>{post.comments}</span>
            </button>
        </div>
    </div>
);


const CommunityScreen: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
                <p className="text-gray-500 dark:text-gray-400">Connect and get motivated.</p>
            </header>

            <div className="bg-primary-500/10 dark:bg-primary-500/20 p-4 rounded-2xl">
                <h3 className="font-bold text-primary-700 dark:text-primary-300">Group Challenge: 5k Run</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">Join 150 others in completing a 5k run this week!</p>
                <button className="mt-2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Join Now</button>
            </div>
            
            <div className="space-y-4">
                {mockFeed.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CommunityScreen;
