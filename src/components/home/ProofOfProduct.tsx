import { Card } from "antd"
import happyDude from "../../assets/feedback.png"

export const ProofOfProduct = () => {
    return (
        <div className="py-10 grid gap-6 grid-cols-2 md:grid-cols-4 md:grid-rows-3 grid-rows-4 justify-between duration-700 transition-all">
            <Card
              className="h-40 mt-auto  text-white bg-zinc-800 hover:bg-orange-500 transition-all shadow-2xl rounded-xl text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="text-4xl lg:text-5xl font-semibold">25K+</h3>
              <p>Active Students</p>
            </Card>
            <Card
              className="h-40 mt-auto  text-white bg-zinc-800  hover:bg-orange-500 transition-all duration-500 shadow-2xl rounded-xl text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="text-4xl lg:text-5xl font-semibold">888+</h3>
              <p>Total Courses</p>
            </Card>

            <div className="row-span-2 md:row-span-3 col-span-2 ml-auto"><img src={happyDude} alt="smiling guy" ></img></div>



            <Card
              className="h-40 mt-auto  text-white bg-zinc-800 hover:bg-orange-500 transition-all shadow-2xl rounded-xl text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="text-4xl lg:text-5xl font-semibold">253+</h3>
              <p>Active Instructors</p>
            </Card>
            <Card
              className="h-40 mt-auto  text-white bg-zinc-800 hover:bg-orange-500 transition-all shadow-2xl rounded-xl text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="text-4xl lg:text-5xl font-semibold">100%</h3>
              <p>Satisfaction Rate</p>
            </Card>

            <div className="col-span-2 my-auto mx-auto">
              Reccomended by the New York Times, Justin Bieber and Elon Musk. Approved by MIT.
              <p className="text-center italic text-xl font-bold font-exo text-orange-600">"Truly the greatest online learning app of all time."</p>
            </div>
          </div>

    )
}