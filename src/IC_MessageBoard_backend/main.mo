import Principal "mo:base/Principal";
import List "mo:base/List";
import Nat "mo:base/Nat";

actor {
    public type Message = {
        title : Text;
        content : Text;
        publisherID : Text;
    };

    stable var messages = List.nil<Message>();

    public shared ({ caller }) func publishMessage(titleText : Text, contentText : Text) {
        let newMessage : Message = {
            title = titleText;
            content = contentText;
            publisherID = Principal.toText(caller);
        };

        messages := List.push(newMessage, messages);
    };

    public query func getAllMessages() : async [Message] {
        return List.toArray(messages);
    };

    public shared ({ caller }) func removeMessage(id : Nat) : async Text {
        switch (List.get<Message>(messages, id)) {
            case (null) { return "Message not found" };
            case (?message) {
                if (Principal.notEqual(Principal.fromText(message.publisherID), caller)) return "You aren't the message publisher";
            };
        };

        let listFront = List.take(messages, id);
        let listBack = List.drop(messages, id + 1);
        messages := List.append(listFront, listBack);
        return ("Removed message #" # Nat.toText(id));
    };
};
