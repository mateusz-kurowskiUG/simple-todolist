import Link from "next/link";
import React from "react";

const SecondAdminNavbar = () => {
	return (
		<div className="sections">
			<ul className=" flex gap-2 text-xl justify-evenly">
				<Link href="/admin/todolists">
					<li>Todolists</li>
				</Link>
			</ul>
		</div>
	);
};

export default SecondAdminNavbar;
