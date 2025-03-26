import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { StarFilled } from '@ant-design/icons';
import SubscriptionService from '../services/subscription.service';
import { authorize } from '../utils/authorize';

interface SubscribeButtonProps {
  instructorName: string;
  instructorId: string;
  apiFlag?: boolean;
  userRole: string;
  initialSubscribedValue?: boolean;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = React.memo(({ instructorId, instructorName, userRole, initialSubscribedValue }) => {
  console.log("SubscribeButton rendered");

  const [isSubscribed, setIsSubscribed] = useState(initialSubscribedValue);
  const [isUnsubscribeModalVisible, setIsUnsubscribeModalVisible] = useState(false);

 
 

  const subscribe = async () => {
    if  (!authorize(userRole)) return;
    if (isSubscribed) {
      setIsUnsubscribeModalVisible(true);
    } else {
      await toggleSubscription();
    }
  };

  const toggleSubscription = async () => {
    const previousState = isSubscribed;
    setIsSubscribed(!isSubscribed);

    try {
      const response = await SubscriptionService.createSubscription(instructorId);
      if (response) {
        setIsSubscribed(!isSubscribed);
      }
    } catch (err) {
      console.error("Error subscribing to instructor:", err);
      setIsSubscribed(previousState)

    }
  };

  const handleUnsubscribeConfirm = async () => {
    setIsUnsubscribeModalVisible(false);
    await toggleSubscription();
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        type="primary"
        className={`
          relative overflow-hidden rounded-full
          font-mono tracking-wider
          transition-all duration-300 ease-in-out
          shadow-md py-5
          ${isSubscribed ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}
          ${isSubscribed ? 'w-40' : 'w-36 hover-btn'}
        `}
        onClick={subscribe}
      >
        <span className="z-10 flex items-center justify-center">
          <span
            className={`
              transition-all duration-300 ease-in-out
              ${isSubscribed ? 'opacity-100 w-5 mr-2 animate-spin-once' : 'opacity-0 w-0'}
            `}
          >
            <StarFilled className={`text-base ${isSubscribed ? 'opacity-100 animate-spin-once' : 'opacity-0 w-0'}`} />
          </span>
          <span className='text-base'>Subscribe{isSubscribed ? 'd' : ''}</span>
        </span>
      </Button>
      <p className="w-60 text-center mt-2 text-xs italic text-gray-500">
        {!isSubscribed ? `Subscribe to be notified of ${instructorName}'s upcoming courses and announcements through your email!` : "You're subscribed to this instructor."}
      </p>

      {/* Unsubscribe Confirmation Modal */}
      <Modal
        open={isUnsubscribeModalVisible}
        title={`Unsubscribe from ${instructorName}?`}
        onCancel={() => setIsUnsubscribeModalVisible(false)}
        onOk={handleUnsubscribeConfirm}
        okText="Unsubscribe"
        cancelText="Cancel"
        centered
        
      >
      </Modal>
    </div>
  );
});

export default SubscribeButton;
