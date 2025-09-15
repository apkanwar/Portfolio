import { GitHub } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const MainCard = ({ image, title, description, tags = [], liveLink, repoLink }) => {
    return (
        <div className="max-w-sm sm:max-w-md sm:min-w-[28rem] group relative overflow-hidden rounded-xl shadow-lg bg-[#323232] z-10 mx-auto flex flex-col h-full">
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Bottom Section */}
            <div className="bg-[#323232] p-5 text-white flex flex-col gap-2 flex-1">
                <h2 className="text-2xl font-bold font-headings">{title}</h2>
                <p className="font-dText min-h-[96px]">{description}</p>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="my-3 flex flex-wrap gap-2 text-sm font-headings">
                        {tags.map((tag, i) => (
                            <h4 key={i} className="px-3 py-1 rounded-full text-dm-black bg-green-200 hover:bg-green-300 font-semibold"> {tag} </h4>
                        ))}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 items-center mt-auto">
                  {liveLink && (
                    <Link href={liveLink} className="block rounded-full bg-eazy-main-100 px-6 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition ease-in duration-200">
                      Visit
                    </Link>
                  )}
                  {repoLink && (
                    <Link href={repoLink}>
                      <div className="flex justify-end items-end">
                        <button className="p-2 rounded-full hover:bg-gray-700 hover:text-eazy-main-90 text-eazy-main-100 transition ease-in duration-200">
                          <GitHub fontSize="large" />
                        </button>
                      </div>
                    </Link>
                  )}
                  {!liveLink && !repoLink && (
                    <p className="mb-1 text-sm text-dm-black italic py-2 bg-white px-6 rounded-lg font-semibold">No Demo Available <span className="text-base ml-2 not-italic">😔</span></p>
                  )}
                </div>
            </div>
        </div>
    );
};

export default MainCard;