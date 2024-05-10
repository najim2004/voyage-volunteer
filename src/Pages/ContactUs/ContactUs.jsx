import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { AuthData } from "../../Context/AuthProvider";
import { Fade, Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import contactUs from "/public/contact-us.json";

const ContactUs = () => {
  const { themeData, headerbg } = useContext(AuthData);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  useEffect(() => nameRef.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Wow! Message successfully sent!");
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
    nameRef.current.focus();
  };
  return (
    <div className="  min-h-screen mx-auto ">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="">
        <div
          className="bg-no-repeat bg-cover h-[300px] bg-right lg:h-[400px] -mt-[83px]"
          style={{ backgroundImage: `url(${headerbg})` }}
        >
          <div
            className={`!bg-opacity-50  bg-${
              !themeData ? "white" : "black"
            } w-full h-full flex flex-col justify-center items-center`}
          >
            <Fade>
              <h3 className=" text-3xl font-semibold">Contact Us</h3>
            </Fade>
            <Zoom>
              <p className="text-center max-w-[650px] mt-4 mx-auto">
                compiles a diverse array of artistic creations and craft
                projects, inspiring creativity and offering endless DIY
                possibilities.
              </p>
            </Zoom>
          </div>
        </div>

        <div className="grid max-w-[1200px] mt-8 lg:mt-12 px-3  mx-auto grid-cols-1 lg:grid-cols-2">
          {/* <div className=" rounded-sm flex flex-col justify-center items-center text-start"> */}
          <Lottie className="max-w-[500px]" animationData={contactUs} />

          {/* <div className="">
              <h3 className="text-2xl font-bold text-center">
                Contact Information
              </h3>
              <hr className="w-full my-4 border-cRed h-[1px]" />

              <h3 className="font-lg text-gry-500 font-medium mb-2">
                <span className="font-bold">Email:</span> admin@example.com
              </h3>

              <h3 className="font-lg text-gry-500 font-medium mb-2">
                <span className="font-bold">Phone:</span> 000-123456789
              </h3>

              <div className="font-lg flex text-gry-500 gap-2 font-medium mb-2 items-start">
                <span className=" font-bold">Address:</span>
                <p className="">23 Main Street, Springfield, Illinois, 62701</p>
              </div>
            </div> */}
          {/* </div> */}

          <div className="p-3">
            {/* <div className="contact-page border-cRed border-[1px] rounded-sm p-6 w-full"> */}
              <h3 className="text-2xl font-semibold text-center">Message Us</h3>
              <p className="my-4 text-center">
                Connect with us easily through our 'Contact Us' page. We're here
                to answer your questions and address any concerns promptly.
              </p>

              <hr className="w-full my-6 border-cRed h-[1px]" />

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-3"
              >
                <div className="form-group">
                  <label className="font-medium" htmlFor="name">
                    YOUR FULL NAME:
                  </label>
                  <br />
                  <input
                    ref={nameRef}
                    placeholder="Your Full Name"
                    className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="font-medium" htmlFor="email">
                    YOUR EMAIL ADDRESS:
                  </label>
                  <br />
                  <input
                    ref={emailRef}
                    placeholder="Your Email Address"
                    className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                    type="email"
                    required
                  />
                </div>
                <div className="form-group lg:col-span-2">
                  <label className="font-medium">YOUR MESSAGE:</label>
                  <br />
                  <textarea
                    ref={messageRef}
                    placeholder="Type Your Message Here"
                    className="p-5 bg-white border-[1px] w-full h-[200px] rounded-[5px]"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full lg:col-span-2 rounded-sm btn bg-cRed text-white text-xl font-semibold"
                >
                  Send Message
                </button>
              </form>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
