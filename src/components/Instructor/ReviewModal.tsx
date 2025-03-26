'use client'

import { Modal, List, Rate } from 'antd'
import { StarFilled } from '@ant-design/icons'

export interface Review {
  _id: string
  reviewer_id: string
  reviewer_name: string
  course_id: string
  course_name: string
  comment: string
  rating: number
  created_at: string
  updated_at: string
  is_deleted: boolean
  __v: number
}

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  reviews: Review[]
}

export default function ReviewModal({ isOpen = false, onClose = () => {}, reviews = [] }: ReviewModalProps) {
  return (
    <Modal
      title="Course Reviews"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <List
        itemLayout="vertical"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            key={review._id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{review.reviewer_name}</span>
                <Rate
                  disabled
                  defaultValue={review.rating}
                  character={<StarFilled />}
                  className="text-yellow-400"
                />
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>Course: {review.course_name}</span>
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Modal>
  )
}