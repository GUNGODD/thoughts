import { Auth } from "../COMPONENTS/Auth";
import { Quote } from "../COMPONENTS/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center text-2xl font-bold">
        <div>
          <Auth type={"signin"} />
        </div>
      </div>
      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};
