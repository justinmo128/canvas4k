lines = 4589
lines -= 1
def convertNotes(notes):
    newNotes = notes
    outp = "["
    for line in newNotes:
        if line == ',':
            outp = outp.rstrip(outp[-1])
            outp += "], ["
        else:
            outp += "\"" + line + "\","
    outp = outp.rstrip(outp[-1])
    outp += "]"
    print(outp)
    outp = ""

contents = []
a = 0
while a < lines:
    try:
        line = input()
    except EOFError:
        break
    contents.append(line)
    a += 1
convertNotes(contents)