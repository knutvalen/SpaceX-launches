import {
    Button,
    Card,
    CardActions,
    CardContent,
    List, ListItem,
    ListItemText
} from "@material-ui/core";
import { useRouter } from "next/router";

export default function LaunchPreview({ launch }) {
    const router = useRouter();

    function onDetailsClick() {
        router.push({
            pathname: '/details',
            query: {
                id: launch.id
            },
        })
    }

    return (
        <Card>
            <CardContent>
                {launch && (
                    <List>
                        <ListItem>
                            <ListItemText primary="Name" secondary={launch.name} />
                        </ListItem>
                    </List>
                )}
            </CardContent>
            <CardActions>
                <Button color="secondary" onClick={() => onDetailsClick()}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};