import { Image } from "@/components/core/Image";
import styles from "./Default.module.scss";
import { Button } from "@/components/core";
import PlayCircleBold from "~icons/solar/play-circle-bold";

export function Default() {
    return (
        <>
            <h1>近期赛事</h1>
            <div className={styles["main"]}>
                <div className={styles["poster"]}>
                    <Image
                        src="https://picsum.photos/1920/1080"
                        width="50%"
                        height="60vh"
                        style={{
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        }}
                    />
                    <div className={styles["info"]}>
                        <span>CdsCTF 2024</span>
                    </div>
                    <div className={styles["enter"]}>
                        <Button
                            icon={<PlayCircleBold />}
                            variant={"outlined"}
                            width="100%"
                            height="100%"
                        >
                            进入
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
