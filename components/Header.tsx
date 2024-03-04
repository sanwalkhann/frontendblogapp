import Nav from "./Nav";
function Header(props: HeaderComponent) {
  // const coverImage = "./assets/istockphoto-1312418309-1024x1024.jpg"; 

  return (
    <header className="w-full flex flex-col py-5 bg-[#141a2c]" style={{ backgroundImage: `url`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Nav />
      <div className="container flex flex-col mx-auto my-32 p-10">
        {
          props.tag === "hidden" ? "" : <p className="text-sm sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-semibold text-white uppercase inline mt-8">
            {props.tag?.replace("-", " ")}
          </p>
        }
        {
          props.title === "hidden" ? " " : <p className="font-bold text-left text-white inline mt-4 text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
            {props.title}
          </p>
        }
      </div>
    </header>
  );
}

Header.defaultProps = {
  tag: "👋 Sanwal",
  title: "Welcome to Dream Bloggers, Where Every Pixel Holds a Story and Every Click Unveils a World of Inspiration"
};

interface HeaderComponent {
  tag?: string;
  title?: string;
}

export default Header;
