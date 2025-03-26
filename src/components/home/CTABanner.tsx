import { Button } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'


export default function CTABanner() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-200 py-8 my-12 rounded-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white p-3 rounded-full mr-4">
            <FaGraduationCap className="text-blue-500 w-8 h-8" />
          </div>
          <h1 className="text-xl font-semibold">Let's Start With Academy LMS</h1>
        </div>
        <div className="space-x-4">
          <Button type="primary" ghost className="bg-white text-blue-500  hover:bg-blue-50">
            I'm A Student
          </Button>
          <Button type="primary" className="bg-orange-500 border-none hover:bg-orange-600 hover:border-orange-600">
            Become An Instructor
          </Button>
        </div>
      </div>
    </div>
  )
}